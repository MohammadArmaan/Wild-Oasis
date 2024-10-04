import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
    HiOutlineChatBubbleBottomCenterText,
    HiOutlineCheckCircle,
    HiOutlineCurrencyDollar,
    HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

const StyledBookingDataBox = styled.section`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);

    overflow: hidden;
`;

const Header = styled.header`
    background-color: var(--color-brand-500);
    padding: 2rem 4rem;
    color: #e0e7ff;
    font-size: 1.8rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
        height: 3.2rem;
        width: 3.2rem;
    }

    & div:first-child {
        display: flex;
        align-items: center;
        gap: 1.6rem;
        font-weight: 600;
        font-size: 1.8rem;
    }

    & span {
        font-family: "Sono";
        font-size: 2rem;
        margin-left: 4px;
    }

    @media (max-width: 900px) {
        flex-direction: column;
    }

    @media (max-width: 778px) {
        & div:first-child {
            font-size: 1.4rem;
        }

        & span {
            font-size: 1.5rem;
        }

        & p {
            font-size: 1.4rem;
        }
    }

    @media (max-width: 375px) {
        & div:first-child {
            font-size: 1.3rem;
            gap: 0.3rem;
            margin-bottom: 1rem;
        }

        & div p {
            font-size: 1.4rem;
            
        }
        svg {
        height: 2rem;
        width: 2rem;
        color: currentColor !important;
    }

        & span {
            font-size: 1.5rem;
        }

        & p {
            font-size: 1rem;
            white-space: nowrap;

        }
    }
`;

const Section = styled.section`
    padding: 3.2rem 4rem 1.2rem;

    @media (max-width: 900px) {
        padding: 2.8rem 1.5rem 1rem;
    }

    @media (max-width: 778px) {
        font-size: 1.3rem;
    }

    @media (max-width: 375px) {
        font-size: 1.3rem;
    }
`;

const Guest = styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 1.6rem;
    color: var(--color-grey-500);

    & p:first-of-type {
        font-weight: 500;
        color: var(--color-grey-700);
    }

    @media (max-width: 900px) {
        font-size: 1.3rem;
    }

    @media (max-width: 375px) {
        font-size: 1.3rem;
        flex-direction: column;
        list-style: none;
        align-items: start;
        justify-content: start;

        & span{
          font-size: 0;
        }
    }
`;

const Price = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem 3.2rem;
    border-radius: var(--border-radius-sm);
    margin-top: 2.4rem;

    background-color: ${({ $isPaid }) =>
        $isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
    color: ${({ $isPaid }) =>
        $isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

    & p:last-child {
        text-transform: uppercase;
        font-size: 1.4rem;
        font-weight: 600;
    }

    svg {
        height: 2.4rem;
        width: 2.4rem;
        color: currentColor !important;
    }

    @media (max-width: 375px) {
      flex-direction: column;
      padding: 1rem 2rem;

      svg {
        height: 2rem;
        width: 2rem;
        color: currentColor !important;
    }
  }
`;

const Footer = styled.footer`
    padding: 1.6rem 4rem;
    font-size: 1.2rem;
    color: var(--color-grey-500);
    text-align: right;

    @media(max-width: 375px){
      white-space: nowrap;

    }
`;

// A purely presentational component
function BookingDataBox({ booking }) {
    const {
        created_at,
        startDate,
        endDate,
        numNights,
        numGuests,
        cabinPrice,
        extrasPrice,
        totalPrice,
        hasBreakfast,
        observations,
        isPaid,
        guests: {
            fullName: guestName,
            email,
            country,
            countryFlag,
            nationalID,
        },
        cabins: { name: cabinName },
    } = booking;

    return (
        <StyledBookingDataBox>
            <Header>
                <div>
                    <HiOutlineHomeModern />
                    <p>
                        {numNights} nights in Cabin <span>{cabinName}</span>
                    </p>
                </div>

                <p>
                    {format(new Date(startDate), "EEE, MMM dd yyyy")} (
                    {isToday(new Date(startDate))
                        ? "Today"
                        : formatDistanceFromNow(startDate)}
                    ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
                </p>
            </Header>

            <Section>
                <Guest>
                    {countryFlag && (
                        <Flag src={countryFlag} alt={`Flag of ${country}`} />
                    )}
                    <p>
                        {guestName}{" "}
                        {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
                    </p>
                    <span>&bull;</span>
                    <p>{email}</p>
                    <span>&bull;</span>
                    <p>National ID {nationalID}</p>
                </Guest>

                {observations && (
                    <DataItem
                        icon={<HiOutlineChatBubbleBottomCenterText />}
                        label="Observations"
                    >
                        {observations}
                    </DataItem>
                )}

                <DataItem
                    icon={<HiOutlineCheckCircle />}
                    label="Breakfast included?"
                >
                    {hasBreakfast ? "Yes" : "No"}
                </DataItem>

                <Price $isPaid={isPaid}>
                    <DataItem
                        icon={<HiOutlineCurrencyDollar />}
                        label={`Total price`}
                    >
                        {formatCurrency(totalPrice)}

                        {hasBreakfast &&
                            ` (${formatCurrency(
                                cabinPrice
                            )} cabin + ${formatCurrency(
                                extrasPrice
                            )} breakfast)`}
                    </DataItem>

                    <p>{isPaid ? "Paid" : "Will pay at property"}</p>
                </Price>
            </Section>

            <Footer>
                <p>
                    Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
                </p>
            </Footer>
        </StyledBookingDataBox>
    );
}

export default BookingDataBox;
