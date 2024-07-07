import CategoryBadge from "@/components/category-badge";
import CopyToClipboard from "@/components/copy-to-clipboard";
import RatingBadge from "@/components/rating-badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { genConfig } from "react-nice-avatar";
import BuySubscription from "../buy-subscription";
import FeedbackReviews from "../feedback-reviews";

const categories = ["action", "crime", "thriller"];

export default function Agent() {
  const [rating, setRating] = useState<number>(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  // const name = "John Wick";
  // const config = genConfig(name);
  const config = genConfig();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-6 relative">
        <div className="col-span-4 h-fit sticky top-28 space-y-5">
          <div className="space-y-4 border rounded-lg p-4 shadow-[0px_0px_20px_0px_#edf2f7]">
            <div className="flex gap-2 justify-between">
              <div className="text-2xl font-semibold">John Wick</div>
              <RatingBadge rating={"5"} />
            </div>

            <div className="space-y-2">
              <div className="text-sm">Categories: </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category, idx) => (
                  <CategoryBadge key={idx} index={idx} category={category} />
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm">Creator: </div>
              <div className="flex gap-2">
                <div>0xA99B....ae35B6</div>
                <CopyToClipboard text="0xA99Bc3dE8d36a4176D22ee329129D351faae35B6" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm">Version: </div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={"v1.0"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.0">v1.0</SelectItem>
                  <SelectItem value="1.1">v1.1</SelectItem>
                  <SelectItem value="1.2">v1.2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Link
              href={`/agents/${23}/contribute`}
              className={cn(buttonVariants({ variant: "default" }), "w-full")}
            >
              Contribute
            </Link>
            <BuySubscription />
          </div>
        </div>
        <div className="space-y-5 col-span-8 ">
          <div className="w-full col-span-8 col-start-5">
            <div className="border rounded-lg p-4 space-y-6 h-fit shadow-[0px_0px_20px_0px_#edf2f7]">
              <div className="flex gap-2 items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm">Price</div>
                  <div className="text-lg font-semibold">0.05 ETH</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm">Duration</div>
                  <div className="text-lg font-semibold">1 Month</div>
                </div>
              </div>
              <Separator />
              <div className="flex gap-2 items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm">Basis Point: </div>
                  <div className="text-lg font-semibold">10 %</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm">Open to Contributors</div>
                  <div className="text-lg font-semibold text-right">No</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4 space-y-6 h-fit shadow-[0px_0px_20px_0px_#edf2f7]">
            <div className="space-y-2">
              <div className="font-semibold text-lg">Description</div>
              <div className="text-sm leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium maxime soluta cumque quae quibusdam, nihil autem,
                commodi corporis, culpa dolorem nesciunt? Voluptates eius alias
                et est commodi perferendis suscipit fugit. Nesciunt, incidunt?
                Dicta repudiandae praesentium corporis, sint commodi expedita ab
                unde harum unde repudiandae eius, totam eaque nemo fugiat sint
                nostrum, placeat inventore suscipit voluptatum vel modi
                voluptates? Odio molestias vero voluptate dicta rerum minus
                pariatur expedita tempore accusamus? A aut ut fugit, corrupti
                eaque doloribus id? Quia iste incidunt voluptates aliquam quae
                porro perferendis sint facilis illo? Necessitatibus ratione quis
                a error, dolorum similique facere alias voluptatibus asperiores
                sed expedita doloremque adipisci quibusdam cumque dignissimos
                architecto? Necessitatibus velit praesentium ad error eaque
                molestiae sunt sapiente, fugiat neque.
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-lg">Instructions</div>
              <div className="text-sm leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium maxime soluta cumque quae quibusdam, nihil autem,
                commodi corporis, culpa dolorem nesciunt? Voluptates eius alias
                et est commodi perferendis suscipit fugit. Nesciunt, incidunt?
                Dicta repu ratione incidunt sed! Dolorem. Quam sint sit,
                voluptatem numquam nihil veritatis. Omnis quidem, neque
                voluptate dolorum eveniet harum unde repudiandae eius, totam
                eaque nemo fugiat sint nostrum, placeat inventore suscipit
                voluptatum vel modi voluptates? Odio molestias vero voluptate
                dicta rerum minus pariatur expedita tempore accusamus? A aut ut
                fugit, corrupti eaque doloribus id? Quia iste incidunt
                voluptates aliquam quae porro perferendis sint facilis illo?
                Necessitatibus ratione quis a error, dolorum similique facere
                alias voluptatibus asperiores sed expedita doloremque adipisci
                quibusdam cumque dignissimos architecto? Necessitatibus velit
                praesentium ad error eaque molestiae sunt sapiente, fugiat
                neque.
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 justify-between">
              <div className="font-semibold">Post Review</div>
              <FeedbackReviews />
            </div>
            <div className="space-y-4 border rounded-lg p-4 shadow-[0px_0px_20px_0px_#edf2f7]">
              <div className="space-y-2">
                <div>Rate Agent</div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={() => handleRatingChange(value)}
                      className={`text-xl focus:outline-none ${
                        value <= rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                    >
                      {value <= rating ? "★" : "☆"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2 ">
                <span>Feedback</span>
                <Textarea
                  cols={4}
                  placeholder="e.g: lorem ipsum dolor sit amet...."
                />
              </div>
              <Button className="w-full mt-2">Submit review</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PreviousRounds = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-2/6">Id</TableHead>
          <TableHead>Time</TableHead>
          <TableHead className="text-right">Transaction</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">
            0xA99Bc3e329129D351faae35B6
          </TableCell>
          <TableCell>6th July 2024</TableCell>
          <TableCell className="text-right">
            <div className="flex gap-2 justify-end">
              <div>0xA99B....ae35B6</div>
              <CopyToClipboard text="0xA99Bc3dE8d36a4176D22ee329129D351faae35B6" />
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};