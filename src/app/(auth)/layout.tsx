interface AuthLayoutPorps{
	children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutPorps) => {
  return (
	<div className="flex flex-col gap-y-4">
		<nav className="w-full bg-red-500">Auth Navbar</nav>
	  {children}
	</div>
  )
}

export default AuthLayout
