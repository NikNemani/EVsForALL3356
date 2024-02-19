export default function Randomizer(props) {
    var rand = Math.floor(Math.random() * props.range + props.base_num);
    return rand
}