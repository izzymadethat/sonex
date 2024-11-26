import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/toaster";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { restoreUser, selectUser } from "@/store/userSlice";
import { useEffect, useState } from "react";
import Loader from "../informational/Loader/Loader";

const RootLayout = () => {
	const dispatch = useDispatch();
	const { currentUser } = useSelector(selectUser);
	const [isUserRestored, setIsUserRestored] = useState(false);

	useEffect(() => {
		dispatch(restoreUser()).finally(() => setIsUserRestored(true));
	}, [dispatch]);

	if (!isUserRestored) {
		return <Loader />;
	}

	return (
		<>
			<Outlet />
			<Toaster />
		</>
	);
};
export default RootLayout;
