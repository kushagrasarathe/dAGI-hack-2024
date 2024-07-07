import CopyToClipboard from "@/components/copy-to-clipboard";
import RatingBadge from "@/components/rating-badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface ReviewProps {
  rating: string;
  feedback: string;
  user: string;
}

const reviews: Array<ReviewProps> = [
  {
    rating: "4.5",
    feedback:
      "The agent behaves just like John Wick whenever asked to do something",
    user: "0xA99Bc3dE8d36a4176D22ee329129D351faae35B6",
  },
  {
    rating: "4.5",
    feedback:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus suscipit reprehenderit labore alias non placeat ratione debitis reiciendis eius veniam. Animi rerum inventore neque, sit unde deleniti enim in perspiciatis! Quod, nulla id? Quam qui illum tempore magni! Cupiditate rerum illum harum ducimus. Labore ea blanditiis commodi ab repellat esse explicabo, quas distinctio sed quod vel tempora perspiciatis et cupiditate. Nisi excepturi eligendi obcaecati hic culpa quis eveniet at blanditiis esse voluptatum dicta quae ad sed eaque dolores tempore neque harum dolor quas, ratione facere illum nobis iure a! Sequi?",
    user: "0xA99Bc3dE8d36a4176D22ee329129D351faae3523",
  },
];

export default function FeedbackReviews() {
  return (
    <Drawer>
      <DrawerTrigger className="text-sm hover:underline text-gray-500">
        View Reviews
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="shadow px-8">
          <DrawerTitle>Reviews</DrawerTitle>
        </DrawerHeader>
        <div className="relative p-8 min-h-fit overflow-y-auto h-fit">
          <div className="grid grid-cols-12 *:col-span-12 md:*:col-span-6 gap-6">
            {reviews.map((review, idx) => (
              <Review
                key={idx}
                user={review.user}
                rating={review.rating}
                feedback={review.feedback}
              />
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

const Review = ({ user, rating, feedback }: ReviewProps) => {
  return (
    <Card className="flex flex-col w-full h-full hover:shadow-inner transition duration-75 hover:bg-gray-50 delay-100">
      <CardHeader>
        <CardTitle className="flex gap-2 justify-between text-xl">
          <div className="flex gap-2 justify-end">
            <div>
              {user.slice(0, 6)}.....{user.slice(user.length - 4, user.length)}
            </div>
            <CopyToClipboard text={user} />
          </div>
          <RatingBadge rating={rating} />
        </CardTitle>
        <CardDescription className="leading-6 line-clamp-4">
          {feedback}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
