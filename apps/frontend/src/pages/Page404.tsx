import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import RouteNames from 'routes/route-names';

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p className="text-red-500 font-semibold text-2xl">
        Page Not Found &#128549;
      </p>
      <Button
        color="primary"
        variant="contained"
        onClick={() => navigate(RouteNames.home)}
      >
        Redirect to homepage
      </Button>
    </div>
  );
};

export default Page404;
