import { useNavigate } from "react-router-dom";

export default function TakeMeHome() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/welcome")}>
      I&apos;m scared, take me home
    </button>
  );
}
