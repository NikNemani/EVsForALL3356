export default function Randomizer(props) {
    return Math.floor(Math.random() * props.range + props.base_num);
}
