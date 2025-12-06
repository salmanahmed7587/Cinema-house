import { BiError } from "react-icons/bi";

function Error({ message }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 mt-10">
      <BiError className="text-red-500 text-6xl mb-3" />

      <h2 className="text-xl font-semibold text-red-600">
        Something went wrong
      </h2>

      <p className="text-gray-600 mt-1">
        {message || "Please try again later."}
      </p>
    </div>
  );
}

export default Error;
