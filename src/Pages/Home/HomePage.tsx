import { useAuth } from "../../Context/AuthContext";
import defineAbilityFor from "../../defineAbility";

const HomePage = () => {
  const { user } = useAuth();
  const ability = defineAbilityFor(user);

  return (
    <>
      <div>HomePage</div>
      <div>Section for User</div>
      {ability.can("read", "Home", "adminSection") && (
        <div>Section for Admin</div>
      )}
    </>
  );
};

export default HomePage;
