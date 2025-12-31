import { Button } from "@/components/ui/button";
import { serialNumberState } from "../Redux/features/serialNumberSlice";

export default function SerialNumberList({
  data,
}: {
  data: serialNumberState[];
}) {
  return (
    <div className=" rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="">
          <tr>
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Prefix</th>
            <th className="p-2 text-left">Start</th>
            <th className="p-2 text-left">Current</th>
            <th className="p-2 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center text-muted-foreground">
                No serial numbers found
              </td>
            </tr>
          )}

          {data.map((item, i) => (
            <tr key={item._id} className="border-t">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{item.prefix}</td>
              <td className="p-2">{item.startNumber}</td>
              <td className="p-2">{item.currentNumber}</td>
              <td className="p-2 text-right">
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
