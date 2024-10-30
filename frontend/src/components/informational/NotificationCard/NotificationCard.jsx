import "./notification-card.css";

const NotificationCard = ({ notification }) => {
  return (
    <div class="notification">
      <div class="notiglow"></div>
      <div class="notiborderglow"></div>
      <div class="notititle">{notification.title}</div>
      <div className="z-10">
        <p className="text-[#32a6ff] px-5 hover:translate-x-1 duration-300 transition-all">
          {notification.author} | {notification.date}
        </p>
        <div class="notibody">{notification.message}</div>
      </div>
    </div>
  );
};

export default NotificationCard;
