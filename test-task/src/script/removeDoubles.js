export default function removeDoubles(idArr=['']) {
    return [...new Set(idArr)]
}