import Paper from '@mui/material/Paper';

type LayoutProps = {
	children: React.ReactNode
}  

export default function PokemonPageLayout({ children }: LayoutProps) {
	return (
		<Paper sx={{ padding: '50px 20px', borderRadius: 0 }}>
			<div style={{ background: '#3d3d3d'}}>
		{children}
		</div>
		</Paper>
	);
}