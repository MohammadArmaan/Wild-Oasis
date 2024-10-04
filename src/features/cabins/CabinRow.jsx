import styled from "styled-components";
import CreateCabinForm from "./CreateCabinForm";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabinHook";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);

  @media (max-width: 768px) {
    width: 100%;
    transform: scale(1.2);
    margin-bottom: 1rem;
  }

  @media (max-width: 375px) {
    width: 100%;
    transform: scale(1);
    margin-bottom: 1.2rem;
  }
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";

  @media (max-width: 768px) {
    font-size: 1.4rem;
    text-align: center;
  }

  @media (max-width: 375px) {
    font-size: 1.2rem;
    text-align: center;
  }
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;

  @media (max-width: 768px) {
    text-align: center;
  }

  @media (max-width: 375px) {
    font-size: 1.2rem;
    text-align: center;
  }
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);

  @media (max-width: 768px) {
    text-align: center;
  }

  @media (max-width: 375px) {
    font-size: 1.2rem;
    text-align: center;
  }
`;

const MaxCapacity = styled.div`
  @media (max-width: 768px) {
    text-align: center;
  }

  @media (max-width: 375px) {
    font-size: 1.2rem;
    text-align: center;
  }
`;

const ActionsContainer = styled.div`
  @media (max-width: 768px) {
    text-align: end;
  }

  @media (max-width: 375px) {
    display: flex;
    justify-content: flex-end;
  }
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <MaxCapacity>Fits up to {maxCapacity} guests</MaxCapacity>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <ActionsContainer>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate} disabled={isCreating}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </ActionsContainer>
    </Table.Row>
  );
}

export default CabinRow;
