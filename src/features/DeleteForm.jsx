
import styled from "styled-components";
import Button from '../ui/Button';
import { useData } from "../context/useDate";

const Row = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    inset: 0; 
    background: #ffffffad;
`;
const Cart = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px; 
    background: #e5dcdc;
    padding: 10px 30px 30px 30px;
    border-radius: 16px;    
    width: 537px; 
`;
const Text = styled.p` 
position: relative;
    left: -12px;
    top: 8px;
    font-size: 20px;
`;
const Buttons = styled.div`
    display: flex;
    justify-content: end;
    gap: 7px;
    position: relative;
    top: 20px;
`;

export default function DeleteForm({ deleteForm, setDeleteForm, nurse }) {
    const { handleDelete, nurseLoading, nurses } = useData();

    return (
        <Row>
            <div>
                <Cart>
                    <Text>Are you sure you want delete this nurse?</Text>
                    <Buttons>
                        <Button
                            size='small'
                            variation='danger'
                            onClick={() => {
                                handleDelete(nurse?._id);
                                setDeleteForm(false);
                            }}
                        >
                            Delete
                        </Button>
                        <Button
                            size='small'
                            variation='secondary'
                            onClick={() => setDeleteForm(false)}
                        >
                            Cancel
                        </Button>
                    </Buttons>
                </Cart>
            </div>
        </Row>
    );
}
