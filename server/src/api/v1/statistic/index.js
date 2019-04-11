import Statistic from "../../../models/statistic";

function createStatisticRoutes(server) {
  server.route([
    {
      method: "GET",
      path: "/api/v1/statistics",
      handler: function (request, reply) {
        return Statistic.find();
      }
    },
    {
      method: "GET",
      path: "/api/v1/statistics/findByDate",
      handler: function (request, reply) {
        if (request.query) {
          const { idate } = request.query;
          const { fdate } = request.query;
          return Statistic.find({ date: { $gte: new Date(idate), $lte: new Date(fdate) } });
        }
        return Statistic.find();
      }
    },
    {
      method: "POST",
      path: "/api/v1/statistics",
      handler: function (request, reply) {
        const { date, liters } = request.payload;
        const statistic = new Statistic({
          date,
          liters
        });

        return statistic.save();
      }
    }
  ]);
}

export default createStatisticRoutes;
