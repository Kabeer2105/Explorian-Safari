export default function ReviewLinks() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <a
        href="https://www.tripadvisor.ie/Attraction_Review-g317084-d25058164-Reviews-Explorian_Safaris-Moshi_Kilimanjaro_Region.html"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition"
      >
        <span className="text-green-600 text-xl">🦉</span>
        <div>
          <p className="font-semibold">TripAdvisor</p>
          <p className="text-sm text-gray-600">Read our reviews</p>
        </div>
      </a>

      <a
        href="https://www.safaribookings.com/reviews/p5449"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition"
      >
        <span className="text-orange-600 text-xl">🦁</span>
        <div>
          <p className="font-semibold">SafariBookings</p>
          <p className="text-sm text-gray-600">4.8/5 rating</p>
        </div>
      </a>
    </div>
  );
}
