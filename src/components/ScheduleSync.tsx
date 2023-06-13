import styles from '../styles/ScheduleSync.module.scss';
import UserSchedule from './UserSchedule';

export default function ScheduleSync() {
	return (
		<div className={styles.wrapper}>
			<h2>ScheduleSync</h2>
			<div className={styles.schedule}>
				<UserSchedule />
			</div>
		</div>
	);
}
