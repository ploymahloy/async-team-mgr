import { BsGlobe } from 'react-icons/bs';
import '../styles/Navbar.scss';

export default function Navbar() {
	return (
		<div className="nav">
			<span className="nav--menu">
				<BsGlobe />
			</span>
			<span>
				<a className="nav--menu" href="#">
					Team Map
				</a>
			</span>
			<span>
				<a className="nav--menu" href="#">
					Edit Team
				</a>
			</span>
			<span>
				<a className="nav--menu" href="#">
					Schedule Sync
				</a>
			</span>
			<span>
				<a className="nav--menu" href="#">
					Messenger
				</a>
			</span>
			<span>
				<a className="nav--menu" href="#">
					Calendar
				</a>
			</span>
			<span>
				<a className="nav--menu" href="#">
					Kanban
				</a>
			</span>
			<span>
				<a className="nav--menu" href="#">
					Log Out
				</a>
			</span>
		</div>
	);
}
