import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
const TextWithBadge = (props) => {
    return (_jsxs(Badge, { badgeContent: props.badgeVal, color: "primary", children: [_jsx(MailIcon, { color: "action" }), " ", props.text] }));
};
export default TextWithBadge;
