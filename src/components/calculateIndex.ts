export default function CalculateIndexNumber (page : number , size : number , totalCount : number , index : number) {
    const lastIndex = totalCount - (page - 1) * size;
    return lastIndex - index;
}