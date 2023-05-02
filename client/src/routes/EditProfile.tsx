import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "../components/Button";
import UserFormData from "../types/UserFormData";

const EditProfile = () => {
  const { register, handleSubmit } = useForm<UserFormData>({
    defaultValues: async () =>
      axios.get(`/user/${userId}`).then(res => res.data),
  });
  const onSubmit = (data: UserFormData) => {
    axios.put(`/user/${userId}`, data).then(() => {
      navigate(`/profile`);
    });
  };
  const { userId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="my-4">
        <label>
          Display Name
          <input
            type="text"
            {...register("displayName", { required: true })}
            className="reset"
          />
        </label>
        <label>
          Location
          <input
            type="text"
            {...register("location", { required: true })}
            className="reset"
          />
        </label>
        <Button submit>Submit</Button>
      </form>
    </div>
  );
};

export default EditProfile;
