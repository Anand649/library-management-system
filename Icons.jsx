// src/components/Icons.jsx
const I = ({ d, size=18, fill="none", stroke="currentColor", extra="" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
    {Array.isArray(d)
      ? d.map((p,i) => p.startsWith("<circle") ? null : <path key={i} d={p}/>)
      : <path d={d}/>}
    {extra && <path d={extra}/>}
  </svg>
);

export const BookIcon       = ({size}) => <I size={size} d={["M4 19.5A2.5 2.5 0 0 1 6.5 17H20","M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"]} />;
export const HomeIcon       = ({size}) => <I size={size} d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />;
export const GridIcon       = ({size}) => (
  <svg width={size||18} height={size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
export const UsersIcon      = ({size}) => <I size={size} d={["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2","M23 21v-2a4 4 0 0 0-3-3.87","M16 3.13a4 4 0 0 1 0 7.75"]} />;
export const UserIcon       = ({size}) => <I size={size} d={["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2","M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8"]} />;
export const ArrowReturnIcon= ({size}) => <I size={size} d={["M9 14l-4-4 4-4","M5 10h11a4 4 0 0 1 0 8h-1"]} />;
export const HistoryIcon    = ({size}) => <I size={size} d={["M3 3v5h5","M3.05 13A9 9 0 1 0 6 5.3L3 8"]} />;
export const SearchIcon     = ({size}) => (
  <svg width={size||18} height={size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
export const BellIcon       = ({size}) => <I size={size} d={["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 0 1-3.46 0"]} />;
export const PlusIcon       = ({size}) => <I size={size} d="M12 5v14M5 12h14" />;
export const EditIcon       = ({size}) => <I size={size} d={["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7","M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"]} />;
export const TrashIcon      = ({size}) => <I size={size} d={["M3 6h18","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"]} />;
export const LogOutIcon     = ({size}) => <I size={size} d={["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4","M16 17l5-5-5-5","M21 12H9"]} />;
export const CloseIcon      = ({size}) => <I size={size} d="M18 6L6 18M6 6l12 12" />;
export const CheckIcon      = ({size}) => <I size={size} d="M20 6L9 17l-5-5" />;
export const ChevronDownIcon= ({size}) => <I size={size} d="M6 9l6 6 6-6" />;
export const ChevronRightIcon=({size}) => <I size={size} d="M9 18l6-6-6-6" />;
export const ClockIcon      = ({size}) => (
  <svg width={size||18} height={size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
export const StarIcon       = ({size, filled}) => (
  <svg width={size||14} height={size||14} viewBox="0 0 24 24" fill={filled?"#c8a96e":"none"} stroke="#c8a96e" strokeWidth="1.5" style={{flexShrink:0}}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
export const HeartIcon      = ({size, filled}) => <I size={size} fill={filled?"currentColor":"none"} d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />;
export const FilterIcon     = ({size}) => <I size={size} d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />;
export const DownloadIcon   = ({size}) => <I size={size} d={["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4","M7 10l5 5 5-5","M12 15V3"]} />;
export const RefreshIcon    = ({size}) => <I size={size} d={["M23 4v6h-6","M1 20v-6h6","M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"]} />;
export const EyeIcon        = ({size, open}) => open
  ? <I size={size} d={["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8","M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6"]} />
  : (
    <svg width={size||18} height={size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
export const MailIcon       = ({size}) => <I size={size} d={["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z","M22 6l-10 7L2 6"]} />;
export const LockIcon       = ({size}) => <I size={size} d={["M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z","M7 11V7a5 5 0 0 1 10 0v4"]} />;
export const PhoneIcon      = ({size}) => <I size={size} d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 7.59 7.59l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />;
export const BarChartIcon   = ({size}) => <I size={size} d={["M12 20V10","M18 20V4","M6 20v-4"]} />;
export const TrendUpIcon    = ({size}) => <I size={size} d={["M23 6l-9.5 9.5-5-5L1 18","M17 6h6v6"]} />;
export const MenuIcon       = ({size}) => <I size={size} d={["M3 12h18","M3 6h18","M3 18h18"]} />;
export const IdCardIcon     = ({size}) => <I size={size} d={["M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5z","M8 10a2 2 0 1 0 4 0 2 2 0 0 0-4 0","M4 20c0-2.5 2-4 6-4","M16 10h4","M16 14h4"]} />;
export const BookOpenIcon   = ({size}) => <I size={size} d={["M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z","M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"]} />;
