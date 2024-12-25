import React from "react"
import './userNotifications.scss'
import ToggleSwitch from "../../../../components/toggleSwitch/ToggleSwitch";

function UserNotifications() {
  return (
    <div className="setting-tab notifications mt-5 mt-md-0">
      <div className="notifications-heading d-flex flex-column gap-2">
        <h5 className="mb-2">Notifications</h5>
        <p className="m-0">Choose how you receive notifications. These notification settings apply to the things you’re watching.</p>
      </div>
      <div className="notifications-table w-100 mt-5">
        <table>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Email</th>
              <th>Push</th>
              <th>SMS</th>
              <th>DND</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p>Login Alert</p>
                <span>Notify when another user mentions you in a comment</span>
              </td>
              <td><ToggleSwitch toggleSwitchId='login-email' /></td>
              <td><ToggleSwitch toggleSwitchId='login-push' /></td>
              <td><ToggleSwitch toggleSwitchId='login-sms' /></td>
              <td><ToggleSwitch toggleSwitchId='login-dnd' /></td>
            </tr>
            <tr>
              <td>
                <p>Payment & Purchase Alert</p>
                <span>Notify when another user comments your item.</span>
              </td>
              <td><ToggleSwitch toggleSwitchId='purchase-email' /></td>
              <td><ToggleSwitch toggleSwitchId='purchase-push' /></td>
              <td><ToggleSwitch toggleSwitchId='purchase-sms' /></td>
              <td><ToggleSwitch toggleSwitchId='purchase-dnd' /></td>
            </tr>
            <tr>
              <td>
                <p>Notification</p>
                <span>Notify when another user follows you.</span>
              </td>
              <td><ToggleSwitch toggleSwitchId='notify-email' /></td>
              <td><ToggleSwitch toggleSwitchId='notify-push' /></td>
              <td><ToggleSwitch toggleSwitchId='notify-sms' /></td>
              <td><ToggleSwitch toggleSwitchId='notify-dnd' /></td>
            </tr>
            <tr>
              <td>
                <p>Entry Exit</p>
                <span>Notify when another user follows you.</span>
              </td>
              <td><ToggleSwitch toggleSwitchId='entry-email' /></td>
              <td><ToggleSwitch toggleSwitchId='entry-push' /></td>
              <td><ToggleSwitch toggleSwitchId='entry-sms' /></td>
              <td><ToggleSwitch toggleSwitchId='entry-dnd' /></td>
            </tr>
            <tr>
              <td>
                <p>Kids Alert</p>
                <span>Notify when another user follows you.</span>
              </td>
              <td><ToggleSwitch toggleSwitchId='kids-email' /></td>
              <td><ToggleSwitch toggleSwitchId='kids-push' /></td>
              <td><ToggleSwitch toggleSwitchId='kids-sms' /></td>
              <td><ToggleSwitch toggleSwitchId='kids-dnd' /></td>
            </tr>
            <tr>
              <td>
                <p>More than 1 device login</p>
                <span>Notify when another user follows you.</span>
              </td>
              <td><ToggleSwitch toggleSwitchId='more-email' /></td>
              <td><ToggleSwitch toggleSwitchId='more-push' /></td>
              <td><ToggleSwitch toggleSwitchId='more-sms' /></td>
              <td><ToggleSwitch toggleSwitchId='more-dnd' /></td>
            </tr>
            <tr>
              <td>
                <p>Attendance Alert</p>
                <span>Notify when another user follows you.</span>
              </td>
              <td><ToggleSwitch toggleSwitchId='attendance-email' /></td>
              <td><ToggleSwitch toggleSwitchId='attendance-push' /></td>
              <td><ToggleSwitch toggleSwitchId='attendance-sms' /></td>
              <td><ToggleSwitch toggleSwitchId='attendance-dnd' /></td>
            </tr>
            
            <tr>
              <td>
                <p>Plan Expiry Alert</p>
                <span>Notify when another user follows you.</span>
              </td>
              <td><ToggleSwitch toggleSwitchId='plan-email' /></td>
              <td><ToggleSwitch toggleSwitchId='plan-push' /></td>
              <td><ToggleSwitch toggleSwitchId='plan-sms' /></td>
              <td><ToggleSwitch toggleSwitchId='plan-dnd' /></td>
            </tr>
            
            <tr>
              <td>
                <p>Activity Alert</p>
                <span>Notify when another user follows you.</span>
              </td>
              <td><ToggleSwitch toggleSwitchId='activity-email' /></td>
              <td><ToggleSwitch toggleSwitchId='activity-push' /></td>
              <td><ToggleSwitch toggleSwitchId='activity-sms' /></td>
              <td><ToggleSwitch toggleSwitchId='activity-dnd' /></td>
            </tr>
            
            <tr>
              <td>
                <p>Chat SMS</p>
                <span>Notify when another user follows you.</span>
              </td>
              <td><ToggleSwitch toggleSwitchId='chat-email' /></td>
              <td><ToggleSwitch toggleSwitchId='chat-push' /></td>
              <td><ToggleSwitch toggleSwitchId='chat-sms' /></td>
              <td><ToggleSwitch toggleSwitchId='chat-dnd' /></td>
            </tr>
            <tr>
              <td>
                <span>Log in from a new device</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserNotifications;
