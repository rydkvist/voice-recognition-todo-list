import styled from "styled-components";
import { useTodoList } from "../context/TodoContext";
import { colors } from "../utils/colors";

type TaskProps = {
  position: number;
  description: string;
  bg: string;
  borderColor: string;
};

export const Task = ({ position, description, bg, borderColor }: TaskProps) => {
  const { onRemoveTask, onTaskDone, onChangeTaskColor } = useTodoList();

  const onDone = (e: any) => {
    onTaskDone(position);
  };

  const onRemove = (e: any) => {
    onRemoveTask(position);
  };

  // const [descriptionInput, setDescriptionInput] = useState(description);

  // const onChangeDescription = (e: any) => {
  //   setDescriptionInput(e.target.value);
  //   onEditDescription(position, descriptionInput);
  // };

  // useEffect(() => {
  //   const thisTask = todoList.find(
  //     (item: TodoItemType) => item.id === position
  //   ) || { value: "" };

  //   setDescriptionInput(thisTask.value);
  // }, [todoList, position]);

  return (
    <StyledCard bg={bg} borderColor={borderColor}>
      <JustifyBetween>
        <Title>{position + 1}</Title>

        <Palette>
          {taskColors.map((color, index) => (
            <Color
              key={index}
              onClick={() =>
                onChangeTaskColor(position, color.bg, color.borderColor)
              }
              bg={color.bg}
              borderColor={color.borderColor}
            />
          ))}
        </Palette>
      </JustifyBetween>

      <Description>{description}</Description>
      <Group>
        <Button
          bg={bg}
          borderColor={borderColor}
          title="Complete"
          onClick={onDone}
        >
          <ion-icon name="checkmark-circle-outline" />
        </Button>
        <Button
          bg={bg}
          borderColor={borderColor}
          title="Remove"
          onClick={onRemove}
        >
          <ion-icon name="close-circle-outline" />
        </Button>
      </Group>
    </StyledCard>
  );
};

export const CompletedTask = ({ description }: any) => {
  return (
    <StyledCard>
      <Title>COMPLETED</Title>
      <Description>{description}</Description>
    </StyledCard>
  );
};

export const taskColors = [
  { bg: colors.lightCyan, borderColor: colors.cyan },
  { bg: colors.pink, borderColor: colors.darkPink },
  { bg: colors.pistachio, borderColor: colors.olive },
  { bg: colors.lightYellow, borderColor: colors.yellow },
];

const StyledCard = styled.div<{ bg?: string; borderColor?: string }>`
  display: flex;
  flex-direction: column;
  width: 15rem;
  padding: 0.625rem 1.25rem;
  margin: 1.25rem 0rem;
  border-radius: 8px;
  background-color: ${(props) => (props.bg ? props.bg : taskColors[0].bg)};
  transition: all 0.3s ease-in-out;
  border: 2px solid
    ${(props) =>
      props.borderColor ? props.borderColor : taskColors[0].borderColor};
`;

const JustifyBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.3125rem;
`;

const Palette = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const Color = styled.button<{ bg: string; borderColor: string }>`
  width: 0.75rem;
  height: 0.75rem;
  margin-left: 0.3125rem;
  background-color: ${(props) => (props.bg ? props.bg : colors.white)};
  border: 1px solid
    ${(props) => (props.borderColor ? props.borderColor : colors.yellow)};
  border-radius: 50%;
  transition: opacity 0.3s ease-in-out;

  &:first-child {
    margin-left: 0rem;
  }
  &:hover {
    opacity: 0.5;
  }
  @media screen and (max-width: 48rem) {
    margin-left: 0.625rem;
    width: 1rem;
    height: 1rem;
  }
`;

const Title = styled.p`
  font-weight: 600;
  text-overflow: ellipsis;
`;

const Description = styled.p`
  overflow-x: hidden;
  margin-bottom: 0.625rem;
`;

const Group = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
  & > button {
    &:first-child {
      margin-right: 0.9375rem;
    }
  }
`;

const Button = styled.button<{ bg?: string; borderColor?: string }>`
  display: grid;
  place-items: center;
  padding: 0.25rem 0.625rem;
  font-size: 1.375rem;
  border-radius: 8px;
  background-color: ${(props) => (props.bg ? props.bg : taskColors[0].bg)};
  border: 1px solid
    ${(props) =>
      props.borderColor ? props.borderColor : taskColors[0].borderColor};
  color: black;

  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.borderColor ? props.borderColor : taskColors[0].borderColor};
  }
  &:focus {
    box-shadow: 0px 0px 5px 2px rgba(163, 221, 203, 0.75);
  }
`;
