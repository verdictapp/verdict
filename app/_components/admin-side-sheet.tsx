import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight, Menu } from "lucide-react";
import Link from "next/link";

const AdminSideSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="mb-5" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Admin Navigation</SheetTitle>
          <SheetDescription>
            Navigate through the admin dashboard.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Link href={"/admin/topics"} className="flex">
            Topics <ChevronRight className="mx-2" />
          </Link>
          <Link href={"/admin/tags"} className="flex">
            Tags <ChevronRight className="mx-2" />
          </Link>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            {/* <Button type="submit">Save changes</Button> */}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AdminSideSheet;
