"use client";
import { useUser } from "@clerk/clerk-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useMemo, useEffect, useState } from "react";
import type { Id } from "../../../convex/_generated/dataModel";

type Application = {
  _id: string;
  userId: string;
  jobTitles: string[];
  companyCount: string;
  targetCountries: string[];
  createdAt: number;
  status: string;
};

interface StatusBadgeProps {
  status: string;
}

const STATUS_COLORS: Record<string, string> = {
  Submitted: "bg-green-100 text-green-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Completed: "bg-gray-100 text-gray-800",
};

function StatusBadge({ status }: StatusBadgeProps) {
  const color = STATUS_COLORS[status] || "bg-gray-100 text-gray-800";
  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>{status}</span>
  );
}

export default function DashboardPage() {
  const { user } = useUser();
  const isAdmin = user?.primaryEmailAddress?.emailAddress === "omarabuhassan4265@gmail.com";

  // Admin: fetch all, User: fetch own
  const allApplications = useQuery(api.applications.getAllApplications, {});
  const userApplication = useQuery(api.applications.getApplication, {});
  const updateStatus = useMutation(api.applications.updateApplicationStatus);

  // For admin, fetch user emails (if needed)
  const applications: Application[] = useMemo(() => {
    if (isAdmin) return (allApplications as Application[]) || [];
    return userApplication ? [userApplication as Application] : [];
  }, [isAdmin, allApplications, userApplication]);

  // State to store userId to email mapping
  const [userEmails, setUserEmails] = useState<Record<string, string>>({});
  const [loadingEmails, setLoadingEmails] = useState(false);

  useEffect(() => {
    if (!isAdmin || applications.length === 0) return;
    setLoadingEmails(true);
    // Fetch emails for all userIds
    Promise.all(
      applications.map(async (app) => {
        try {
          // Clerk userId is the same as app.userId
          const res = await fetch(`/api/clerk-user-email?userId=${app.userId}`);
          if (!res.ok) throw new Error("Failed to fetch");
          const data = await res.json();
          return { userId: app.userId, email: data.email };
        } catch {
          return { userId: app.userId, email: "Unknown" };
        }
      })
    ).then((results) => {
      const map: Record<string, string> = {};
      results.forEach(({ userId, email }) => {
        map[userId] = email;
      });
      setUserEmails(map);
      setLoadingEmails(false);
    });
  }, [isAdmin, applications]);

  if (!user) return <div>Loading...</div>;

  if (isAdmin) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="overflow-x-auto">
          {loadingEmails ? (
            <div>Loading user emails...</div>
          ) : (
            <table className="min-w-full bg-white border rounded shadow">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">User Email</th>
                  <th className="px-4 py-2 border">Job Titles</th>
                  <th className="px-4 py-2 border">Company Count</th>
                  <th className="px-4 py-2 border">Preferred Countries</th>
                  <th className="px-4 py-2 border">Submission Date</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app: Application) => (
                  <tr key={app._id}>
                    <td className="px-4 py-2 border">{userEmails[app.userId] || "Unknown"}</td>
                    <td className="px-4 py-2 border">{app.jobTitles?.join(", ")}</td>
                    <td className="px-4 py-2 border">{app.companyCount}</td>
                    <td className="px-4 py-2 border">{app.targetCountries?.join(", ")}</td>
                    <td className="px-4 py-2 border">{new Date(app.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2 border">
                      <select
                        className="border rounded px-2 py-1"
                        value={app.status}
                        onChange={async (e) => {
                          await updateStatus({ status: e.target.value, _id: app._id as Id<"applications">, userId: app.userId });
                        }}
                      >
                        <option value="Submitted">Submitted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }

  // User dashboard
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Job Titles</th>
              <th className="px-4 py-2 border">Company Count</th>
              <th className="px-4 py-2 border">Preferred Countries</th>
              <th className="px-4 py-2 border">Submission Date</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app: Application) => (
              <tr key={app._id}>
                <td className="px-4 py-2 border">{app.jobTitles?.join(", ")}</td>
                <td className="px-4 py-2 border">{app.companyCount}</td>
                <td className="px-4 py-2 border">{app.targetCountries?.join(", ")}</td>
                <td className="px-4 py-2 border">{new Date(app.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">
                  <StatusBadge status={app.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
