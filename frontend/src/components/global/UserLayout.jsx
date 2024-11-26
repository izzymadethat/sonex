import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import SideBar from "./Sidebar";
import Topbar from "./Topbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, restoreUser, selectUser } from "@/store/userSlice";
import {
	getProjects,
	selectAllProjects,
	unloadProjects,
} from "@/store/projectSlice";
import { fetchComments, unloadComments } from "@/store/commentSlice";
import { toast } from "@/hooks/use-toast";
import { unloadFiles } from "@/store/fileSlice";
import Loader from "../informational/Loader/Loader";

const UserLayout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isLoaded, setIsLoaded] = useState(false);
	const { currentUser, error } = useSelector(selectUser);
	const { projects } = useSelector(selectAllProjects);

	useEffect(() => {
		if (currentUser) {
			const fetchData = async () => {
				if (!projects) await dispatch(getProjects());
				await dispatch(fetchComments());
				setIsLoaded(true);
			};

			fetchData();
		} else {
			navigate("/");
		}
	}, [dispatch, currentUser, projects, navigate]);

	const handleLogout = async () => {
		await dispatch(unloadProjects());
		await dispatch(unloadComments());
		await dispatch(unloadFiles());
		await dispatch(logoutUser());
		toast({
			title: "Logged Out Sucessfully!",
			description: "You have been logged out.",
		});
		if (logoutUser.fulfilled) {
			return navigate("/");
		}
	};

	if (error) {
		toast({
			title: "Error",
			description: error,
		});
		return navigate("/");
	}

	if (!isLoaded || !currentUser) {
		return <Loader />;
	}

	return (
		<>
			<SidebarProvider>
				<div className="flex w-full">
					{currentUser && <SideBar onLogoutClick={handleLogout} />}
					<div className="w-full mx-6 lg:mx-4">
						<Topbar />
						<div className="mt-8 lg:mx-6 xl:max-w-6xl xl:mx-auto">
							<Outlet />
						</div>
					</div>
				</div>
			</SidebarProvider>
		</>
	);
};

export default UserLayout;
