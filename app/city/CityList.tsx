import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { fetchCity,SetCurrentCity,clearCurrentCity,setOpenModel,setCloseModel } from "../Redux/features/CitySlice";

export function CityList() {
  
  const dispatch = useAppDispatch();
  const { cityList } = useAppSelector((state) => state.City);

  useEffect(() => {
    dispatch(fetchCity())
  }, [dispatch]);


  return (
    <Table className="">
      <TableHeader className="">
        <TableRow>
          <TableHead className="p-2">#</TableHead>
          <TableHead className="p-2 text-left">City</TableHead>
          <TableHead className="p-2 text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cityList.map((c, i) => (
          <tr key={c._id} className="border-t">
            <td className="p-2">{i + 1}</td>
            <td className="p-2">{c.cityName}</td>
            <td className="p-2 text-right">
              <Button size="sm" variant="outline"
              onClick={()=>{
                dispatch(SetCurrentCity(c));
                dispatch(setOpenModel(true))
              }}
              >Edit</Button>
            </td>
          </tr>
        ))}
      </TableBody>
    </Table>
  );
}
