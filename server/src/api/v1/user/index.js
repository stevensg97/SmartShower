import User from "../../../models/user";

function createUserRoutes(server) {
  server.route([
    {
      method: "GET",
      path: "/api/v1/users",
      handler: function(request, reply) {
        return User.find();
      }
    },
    {
      method: "GET",
      path: "/api/v1/users/findOne",
      handler: function(request, reply) {
        if(request.query){
          const { email } = request.query
          return User.find({ email });
        }
        return User.find();
      }
    },
    {
      method: "POST",
      path: "/api/v1/users",
      handler: function(request, reply) {
        const { name, lastname, email, password } = request.payload;
        const user = new User({
          name,
          lastname,
          email,
          password
        });

        return user.save();
      }
    }
  ]);
}

export default createUserRoutes;
