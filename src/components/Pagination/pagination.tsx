import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack'

interface Props {
    page : any
    totalCount : number
    size : number
}
export default function Paginate ({

    page, size, totalCount

} : Props) {

    function handleChange (e:React.ChangeEvent<unknown>, pageNumber : number){
        
    }
    
    return(
        <>
        <Stack spacing={2}>
            <Pagination page={parseInt(page)} count={Math.ceil(totalCount/size)} shape="rounded" onChange={handleChange} boundaryCount={1} showFirstButton showLastButton/>
        </Stack>
        </>
    )
}