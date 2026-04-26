"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

type Review = {
  id: string;
  rating: number;
  comment: string | null;
  user: { name: string };
};

export default function ProductReviews({
  productId,
  initialReviews,
}: {
  productId: string;
  initialReviews: Review[];
}) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, rating, comment }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to submit review");
      setLoading(false);
    } else {
      setReviews([data, ...reviews]);
      setSubmitted(true);
      setComment("");
    }
    setLoading(false);
  }

  return (
    <div className="mt-16">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
        {reviews.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${s <= Math.round(avgRating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {avgRating.toFixed(1)} ({reviews.length} review
              {reviews.length > 1 ? "s" : ""})
            </span>
          </div>
        )}
      </div>

      {/* Review form */}
      {session && !submitted && (
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <h3 className="font-medium mb-4">Write a review</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Your rating</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onMouseEnter={() => setHoveredStar(s)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => setRating(s)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-7 h-7 transition-colors ${
                        s <= (hoveredStar || rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this product..."
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none h-24 transition-colors"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-3 py-2 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              size="sm"
              disabled={loading}
              className="w-fit bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? "Submitting..." : "Submit review"}
            </Button>
          </form>
        </div>
      )}

      {submitted && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm px-4 py-3 rounded-xl mb-8">
          ✓ Thanks for your review!
        </div>
      )}

      {!session && (
        <div className="bg-secondary border border-border rounded-xl p-4 mb-8 text-sm text-muted-foreground">
          <a href="/login" className="text-primary hover:underline">
            Sign in
          </a>{" "}
          to write a review.
        </div>
      )}

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          No reviews yet — be the first!
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/20 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
                    {review.user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">
                    {review.user.name}
                  </span>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${s <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
              </div>
              {review.comment && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {review.comment}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
