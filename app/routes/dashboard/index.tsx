import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const ADMIN_EMAIL = "omarabuhassan4265@gmail.com";

export default function DashboardPage() {
  const { user } = useUser();
  const isAdmin = user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL;

  // Fetch current user's application
  const userApplication = useQuery(api.applications.getApplication, {});
  // Fetch all applications if admin
  const allApplications = isAdmin ? useQuery(api.applications.getAllApplications, {}) : [];

  if (!user) return <div className="p-8 text-center">Loading...</div>;

  if (isAdmin) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 border">User ID</th>
                <th className="px-4 py-2 border">Goal</th>
                <th className="px-4 py-2 border">Location</th>
                <th className="px-4 py-2 border">Work Style</th>
                <th className="px-4 py-2 border">Experience</th>
                <th className="px-4 py-2 border">Startup Pref</th>
                <th className="px-4 py-2 border">Team Vibe</th>
                <th className="px-4 py-2 border">Countries</th>
                <th className="px-4 py-2 border">CV URL</th>
                <th className="px-4 py-2 border">CV Opt</th>
                <th className="px-4 py-2 border">Job Titles</th>
                <th className="px-4 py-2 border">Company Count</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Created</th>
                <th className="px-4 py-2 border">Updated</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(allApplications) && allApplications.length > 0 ? allApplications.map((app) => (
                <tr key={app._id}>
                  <td className="px-4 py-2 border">{app.userId}</td>
                  <td className="px-4 py-2 border">{app.goal}</td>
                  <td className="px-4 py-2 border">{app.location}</td>
                  <td className="px-4 py-2 border">{app.workStyle}</td>
                  <td className="px-4 py-2 border">{app.experienceLevel}</td>
                  <td className="px-4 py-2 border">{app.startupPreference}</td>
                  <td className="px-4 py-2 border">{app.teamVibe}</td>
                  <td className="px-4 py-2 border">{Array.isArray(app.targetCountries) ? app.targetCountries.join(", ") : "N/A"}</td>
                  <td className="px-4 py-2 border">{app.cvFileUrl || "N/A"}</td>
                  <td className="px-4 py-2 border">{app.cvOptimization}</td>
                  <td className="px-4 py-2 border">{Array.isArray(app.jobTitles) ? app.jobTitles.join(", ") : "N/A"}</td>
                  <td className="px-4 py-2 border">{app.companyCount}</td>
                  <td className="px-4 py-2 border">{app.status}</td>
                  <td className="px-4 py-2 border">{app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "N/A"}</td>
                  <td className="px-4 py-2 border">{app.updatedAt ? new Date(app.updatedAt).toLocaleDateString() : "N/A"}</td>
                </tr>
              )) : (
                <tr><td colSpan={15} className="text-center p-8">No applications found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Regular user dashboard
  if (!userApplication) {
    return <div className="p-8 text-center text-gray-500">You have not submitted any applications yet.</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Application</h1>
      <div className="bg-white rounded shadow p-6 space-y-4">
        <div><strong>Goal:</strong> {userApplication.goal}</div>
        <div><strong>Location:</strong> {userApplication.location}</div>
        <div><strong>Work Style:</strong> {userApplication.workStyle}</div>
        <div><strong>Experience Level:</strong> {userApplication.experienceLevel}</div>
        <div><strong>Startup Preference:</strong> {userApplication.startupPreference}</div>
        <div><strong>Team Vibe:</strong> {userApplication.teamVibe}</div>
        <div><strong>Target Countries:</strong> {Array.isArray(userApplication.targetCountries) ? userApplication.targetCountries.join(", ") : "N/A"}</div>
        <div><strong>CV File URL:</strong> {userApplication.cvFileUrl || "N/A"}</div>
        <div><strong>CV Optimization:</strong> {userApplication.cvOptimization}</div>
        <div><strong>Job Titles:</strong> {Array.isArray(userApplication.jobTitles) ? userApplication.jobTitles.join(", ") : "N/A"}</div>
        <div><strong>Company Count:</strong> {userApplication.companyCount}</div>
        <div><strong>Status:</strong> {userApplication.status}</div>
        <div><strong>Created At:</strong> {userApplication.createdAt ? new Date(userApplication.createdAt).toLocaleDateString() : "N/A"}</div>
        <div><strong>Updated At:</strong> {userApplication.updatedAt ? new Date(userApplication.updatedAt).toLocaleDateString() : "N/A"}</div>
      </div>
    </div>
  );
} 