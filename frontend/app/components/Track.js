export default function Track({track}) {

    function timeFormat(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    return (
        <tr>
            {/* <td>{track.id}</td> */}
            <td>{track.rank}</td>
            <td>{track.title}</td>
            {/* <td>{track.title_short}</td> */}
            <td>{timeFormat(track.duration)}</td>
        </tr>
    )
}