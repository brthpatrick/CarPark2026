import { Card, CardContent, Box, Skeleton } from "@mui/material"

export function CarItemSkeleton() {
    return (
        <Card variant="outlined" sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            mb: 2, overflow: 'hidden'
        }}>
            <Skeleton
                variant="rectangular"
                sx={{ width: { xs: '100%', sm: 280 }, height: { xs: 200, sm: 180 } }}
            />
            <CardContent sx={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" height={32} />
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.5, my: 1 }}>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
                    <Skeleton variant="rounded" width={80} height={24} />
                    <Skeleton variant="rounded" width={80} height={24} />
                    <Skeleton variant="rounded" width={80} height={24} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Skeleton variant="text" width={120} height={32} />
                    <Skeleton variant="rounded" width={100} height={32} />
                </Box>
            </CardContent>
        </Card>
    )
}
