import { JOB_STATUSES } from "../utils/constants";

const JobCard = ({ job, onDelete, onUpdate }) => {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{job.company}</h3>
          <p className="text-sm text-slate-600">{job.role}</p>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
          {job.status}
        </span>
      </div>

      {job.link && (
        <a
          href={job.link}
          target="_blank"
          rel="noreferrer"
          className="mb-4 block text-sm text-blue-600 underline"
        >
          View Job Link
        </a>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={job.status}
          onChange={(e) => onUpdate(job._id, { status: e.target.value })}
          className="rounded-md border px-3 py-2 text-sm"
        >
          {JOB_STATUSES.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>

        <button
          onClick={() => onDelete(job._id)}
          className="rounded-md bg-red-500 px-4 py-2 text-sm text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
