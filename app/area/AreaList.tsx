import { Button } from "@/components/ui/button";

interface Area {
  id: number;
  areaName: string;
  cityId: string;
}

export default function AreaList({ data }: { data: Area[] }) {
  return (
    <div className="rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="">
          <tr>
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Area</th>
            <th className="p-2 text-left">City</th>
            <th className="p-2 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-center text-muted-foreground">
                No areas found
              </td>
            </tr>
          )}

          {data.map((area, i) => (
            <tr key={area.id} className="border-t">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{area.areaName}</td>
              <td className="p-2 capitalize">{area.cityId}</td>
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
