import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const ADMIN_EMAIL = "omarabuhassan4265@gmail.com";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const isAdmin = user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL;

  // Fetch current user's application with error handling
  const userApplication = useQuery(api.applications.getApplication, {});
  // Fetch all applications if admin
  const allApplications = isAdmin ? useQuery(api.applications.getAllApplications, {}) : [];

  // Loading state
  if (!isLoaded) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Loading user...</p>
      </div>
    );
  }

  // Not signed in
  if (!user) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-600">Please sign in to view your dashboard.</p>
      </div>
    );
  }

  // Loading state for queries
  if (userApplication === undefined || (isAdmin && allApplications === undefined)) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Loading your data...</p>
      </div>
    );
  }

  // Admin dashboard
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
                  <td className="px-4 py-2 border">{app.userId || "N/A"}</td>
                  <td className="px-4 py-2 border">{app.goal || "N/A"}</td>
                  <td className="px-4 py-2 border">{app.location || "N/A"}</td>
                  <td className="px-4 py-2 border">{app.workStyle || "N/A"}</td>
                  <td className="px-4 py-2 border">{app.experienceLevel || "N/A"}</td>
                  <td className="px-4 py-2 border">{app.startupPreference || "N/A"}</td>
                  <td className="px-4 py-2 border">{app.teamVibe || "N/A"}</td>
                  <td className="px-4 py-2 border">{Array.isArray(app.targetCountries) ? app.targetCountries.join(", ") : "N/A"}</td>
                  <td className="px-4 py-2 border">{app.cvFileUrl || "N/A"}</td>
                  <td className="px-4 py-2 border">{app.cvOptimization || "N/A"}</td>
                  <td className="px-4 py-2 border">{Array.isArray(app.jobTitles) ? app.jobTitles.join(", ") : "N/A"}</td>
                  <td className="px-4 py-2 border">{app.companyCount || "N/A"}</td>
                  <td className="px-4 py-2 border">{app.status || "N/A"}</td>
                  <td className="px-4 py-2 border">{app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "N/A"}</td>
                  <td className="px-4 py-2 border">{app.updatedAt ? new Date(app.updatedAt).toLocaleDateString() : "N/A"}</td>
                </tr>
              )) : (
                <tr><td colSpan={15} className="text-center p-8 text-gray-500">No applications found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Regular user dashboard - no application found
  if (!userApplication) {
    return (
      <div className="p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Welcome to Your Dashboard</h1>
            <p className="text-gray-600 mb-6">You haven't submitted an application yet. Let's get started!</p>
          </div>
          <a 
            href="/onboarding" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Start Your Application
          </a>
        </div>
      </div>
    );
  }

  // Regular user dashboard - application found
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Application</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><strong>Goal:</strong> {userApplication.goal || "N/A"}</div>
          <div><strong>Location:</strong> {userApplication.location || "N/A"}</div>
          <div><strong>Work Style:</strong> {userApplication.workStyle || "N/A"}</div>
          <div><strong>Experience Level:</strong> {userApplication.experienceLevel || "N/A"}</div>
          <div><strong>Startup Preference:</strong> {userApplication.startupPreference || "N/A"}</div>
          <div><strong>Team Vibe:</strong> {userApplication.teamVibe || "N/A"}</div>
          <div><strong>Company Count:</strong> {userApplication.companyCount || "N/A"}</div>
          <div><strong>Status:</strong> 
            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
              userApplication.status === 'completed' ? 'bg-green-100 text-green-800' :
              userApplication.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
              userApplication.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {userApplication.status || "N/A"}
            </span>
          </div>
        </div>
        
        <div><strong>Target Countries:</strong> {Array.isArray(userApplication.targetCountries) ? userApplication.targetCountries.join(", ") : "N/A"}</div>
        <div><strong>Job Titles:</strong> {Array.isArray(userApplication.jobTitles) ? userApplication.jobTitles.join(", ") : "N/A"}</div>
        <div><strong>CV File URL:</strong> {userApplication.cvFileUrl || "N/A"}</div>
        <div><strong>CV Optimization:</strong> {userApplication.cvOptimization || "N/A"}</div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          <div><strong>Created:</strong> {userApplication.createdAt ? new Date(userApplication.createdAt).toLocaleDateString() : "N/A"}</div>
          <div><strong>Last Updated:</strong> {userApplication.updatedAt ? new Date(userApplication.updatedAt).toLocaleDateString() : "N/A"}</div>
        </div>
      </div>
    </div>
  );
} 