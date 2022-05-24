import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

interface TextWithBadgeProps {
	text: string;
	badgeVal: number;
}

const TextWithBadge = (props: TextWithBadgeProps) => {
	return (
		<Badge badgeContent={props.badgeVal} color="primary">
			<MailIcon color="action" /> {props.text}
		</Badge>
	);
};

export default TextWithBadge;
