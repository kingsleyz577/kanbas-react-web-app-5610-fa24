import { FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";

export default function AssignmentsButtons() {
  return (
    <div className="d-flex justify-content-center align-items-center gap-2">
      <div className="border rounded-pill px-4 py-1 fs-5 text-dark">
        40% of total
      </div>
      <FaPlus className="fs-4 text-muted cursor-pointer" aria-label="Add" />
      <IoEllipsisVertical className="fs-4 text-muted cursor-pointer" aria-label="More Options" />
    </div>
  );
}
