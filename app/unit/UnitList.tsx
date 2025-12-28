import { Button } from "@/components/ui/button";

interface Unit {
  id: number;
  unitName: string;
  unitShort: string;
}

export default function UnitList({ data }: { data: Unit[] }) {
  return (
    <div className="rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="">
          <tr>
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Unit Name</th>
            <th className="p-2 text-left">Short</th>
            <th className="p-2 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-center text-muted-foreground">
                No units found
              </td>
            </tr>
          )}

          {data.map((unit, i) => (
            <tr key={unit.id} className="border-t">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{unit.unitName}</td>
              <td className="p-2">{unit.unitShort}</td>
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
