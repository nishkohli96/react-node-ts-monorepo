import Image from 'next/image';
import Link from 'next/link';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeChangeButton } from '@/components';

export default function AppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <Link href="/" style={{ marginRight: '10px' }}>
            <Image src="/favicon.ico" alt="Logo" width={40} height={40} />
          </Link>
          <Box sx={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              <Typography variant="h6" component="div">
                NextJS App
              </Typography>
            </Link>
          </Box>
          <Typography variant="h6" component="div">
            <ThemeChangeButton />
          </Typography>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
