export default function TopNavigation() {
  return (
    <div className="topnav">
      <div className="topnav-left">
        <div className="logo">
          <img src="/logo.png" alt="logo" />
        </div>
      </div>

      {/* topnav-right */}
      <div className="topnav-right">
        <div className="profile">
          <img src="/profile.png" alt="profile" />
        </div>
      </div>
    </div>
  );
}