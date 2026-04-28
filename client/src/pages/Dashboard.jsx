import { useEffect, useMemo, useState } from "react";
import JobCard from "../components/JobCard";
import FormInput from "../components/FormInput";
import {
  createJob,
  deleteJob,
  getJobs,
  updateJob,
} from "../services/jobService";
import { JOB_STATUSES } from "../utils/constants";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    link: "",
  });

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.company || !formData.role) {
      setError("Company and role are required");
      return;
    }

    try {
      await createJob(formData);
      setFormData({
        company: "",
        role: "",
        status: "Applied",
        link: "",
      });
      fetchJobs();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create job");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      fetchJobs();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete job");
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      await updateJob(id, updates);
      fetchJobs();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update job");
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.role.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        filterStatus === "All" ? true : job.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, search, filterStatus]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>

      {error && (
        <p className="mb-4 rounded-md bg-red-100 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="mb-8 grid gap-4 rounded-lg bg-white p-6 shadow md:grid-cols-2">
        <form onSubmit={handleAddJob} className="space-y-4">
          <h2 className="text-xl font-semibold">Add Job</h2>

          <FormInput
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Google"
          />
          <FormInput
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Frontend Developer"
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="rounded-md border border-slate-300 px-4 py-2"
            >
              {JOB_STATUSES.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>

          <FormInput
            label="Job Link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://..."
          />

          <button
            type="submit"
            className="rounded-md bg-emerald-600 px-4 py-2 text-white"
          >
            Add Job
          </button>
        </form>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Filters</h2>

          <FormInput
            label="Search"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company or role"
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">
              Filter Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-md border border-slate-300 px-4 py-2"
            >
              <option>All</option>
              {JOB_STATUSES.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="rounded-md bg-slate-100 p-4">
            <p className="text-sm text-slate-600">Total Jobs</p>
            <p className="text-2xl font-bold">{filteredJobs.length}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        ) : (
          <p className="text-slate-500">No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
