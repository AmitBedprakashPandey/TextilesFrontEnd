import { Button } from "@/components/ui/button";
import {  Table, TableBody, TableHead, TableHeader, TableRow,} from "@/components/ui/table";

export function CityList({ data }: { data: any[] }) {
  return (
    <Table className="">
      <TableHeader className="">
        <TableRow>
          <TableHead className="p-2">#</TableHead>
          <TableHead className="p-2 text-left">City</TableHead>
          <TableHead className="p-2 text-left">Code</TableHead>
          <TableHead className="p-2 text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((c, i) => (
          <tr key={c.id} className="border-t">
            <td className="p-2">{i + 1}</td>
            <td className="p-2">{c.cityName}</td>
            <td className="p-2">{c.cityCode}</td>
            <td className="p-2 text-right">
              <Button size="sm" variant="outline">Edit</Button>
            </td>
          </tr>
        ))}
      </TableBody>
    </Table>
  );
}
