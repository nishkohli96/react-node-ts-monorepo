import type { Metadata } from 'next';
import Paper from '@mui/material/Paper';

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Pokemon',
  description: 'List of pokemons'
};

export default function PokemonPageLayout({ children }: LayoutProps) {
  return (
    <Paper
      sx={{
        padding: '50px 20px',
        borderRadius: 0
      }}
    >
      <div style={{ background: '#3d3d3d' }}>
        {children}
      </div>
    </Paper>
  );
}
