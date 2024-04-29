
export type GraphicInfo = {
    path: string,
    title: string,
    description: string
}
export const GraphicInfoList: GraphicInfo[] = [
    {
        title: 'Fighter Card',
        description: 'A card full of juicy fencer information',
        path: '/config/fightercard'
    },
    {
        title: 'Lower Third',
        description: 'A smaller card to show at the bottom of the screen',
        path: '/config/lowerthird'
    },
]