const Profile = () => {
  return <p>Profile</p>;
};

export default Profile;

// (
//   <div className="w-full max-w-5xl mx-auto my-4 space-y-4 overflow-y-scroll">
//   <h1 className="text-3xl font-bold uppercase">Profile</h1>
//   <Card className="px-4 py-2">
//     <CardHeader>
//       <h4 className="text-xl font-bold text-center">Edit Your Profile</h4>
//     </CardHeader>
//     <CardBody>
//       <form className="w-full space-y-4 ">
//         <div className="grid grid-cols-2 gap-4">
//           <Input isRequired label="First Name" placeholder="First Name" />
//           <Input isRequired label="Last Name" placeholder="Last Name" />
//         </div>
//         <Input
//           isDisabled
//           label="Username"
//           placeholder="izzy850 (cannot be changed)"
//         />
//         <Input
//           isDisabled
//           label="Email"
//           placeholder="user@email.com (cannot be changed)"
//         />
//         <Input
//           label="Old Password"
//           type="password"
//           placeholder="Old Password"
//         />
//         <Input
//           type="password"
//           label="New Password"
//           placeholder="New Password"
//         />
//         <Input
//           type="password"
//           label="Confirm Password"
//           placeholder="Confirm Password"
//         />
//         <Input
//           type="file"
//           label="Profile Picture"
//           labelPlacement="outside-left"
//           placeholder="Profile Picture"
//         />
//         <Textarea label="Bio" placeholder="Enter your bio" />
//       </form>
//     </CardBody>
//     <CardFooter>
//       <Button type="submit">Save Changes</Button>
//     </CardFooter>
//   </Card>

//   {/* Account Settings - Notifications */}
//   <Card className="px-4 py-2">
//     <CardHeader>
//       <h4 className="text-xl font-bold text-center">Notifications</h4>
//     </CardHeader>
//     <CardBody>
//       <h1>Edit Your Notifications: TODO</h1>
//     </CardBody>
//     <CardFooter className="flex gap-2">
//       <Button variant="ghost" type="button">
//         Select All
//       </Button>
//       <Button type="button">Save Changes</Button>
//     </CardFooter>
//   </Card>

//   {/* Account Settings - The Danger Zone */}
//   <Card className="px-4 py-2">
//     <CardHeader>
//       <h4 className="text-xl font-bold text-center">Danger Zone</h4>
//     </CardHeader>
//     <CardBody>
//       <h1>Delete Account</h1>
//       <p>
//         Are you sure you want to delete your account? This action can&apos;t
//         be undone.
//       </p>
//     </CardBody>
//     <CardFooter>
//       <p>
//         <Button type="button" color="danger">
//           Delete Account
//         </Button>
//       </p>
//     </CardFooter>
//   </Card>
// </div>
// )
