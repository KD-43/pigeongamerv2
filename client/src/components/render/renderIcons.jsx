import { Box } from '@mui/material';

export default function RenderIcon ({ icons = [], status, onHover }) {
    console.log('priceChange', status);

    if (status) {
        const render = icons.find((i) => i.state === status);
        if (render === undefined || render === null) {
            return null;
        };

        const renderBase = onHover ? { backgroundColor: `${render.primaryColor}`, color: `${secondaryColor}` } : { border: `1px solid ${render.primaryColor}` };
        const renderText = onHover ? { color: `${render.SecondaryColor}` } : { color: `${render.primaryColor}` };

        return (
            <Box sx={{ width: 40, height: 40, borderRadius: '100%', display: 'grid', placeItems: 'center', ...renderBase, ...renderText }}>
                {render && <render.icon />}
            </Box>
        )
    }
}