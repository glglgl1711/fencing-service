'use client'

interface Props {
    size?: number
}
export default function ListSizeBox ({
    size
} : Props) {

    return(
        <>
        <div className="selectBox">
            <select>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="150">150</option>
            </select>
        </div>
        </>
    )
}