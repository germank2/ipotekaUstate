window.addEventListener('DOMContentLoaded', (e) => {
	function numberWithSpaces(x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); }
	function ipoteka(sum, year, stavka) {
		stavkaMonth = stavka / 12 / 100;
		obshStavka = (1 + stavkaMonth) ** (year * 12);
		itogo = parseInt(sum * stavkaMonth * obshStavka / (obshStavka - 1));
		return itogo;
	}
	const cost = document.getElementById("cost");
	const payment = document.getElementById("payment");
	const period = document.getElementById("period");
	const rate = document.getElementById("rate");
	const costResult = document.getElementById("costResult");
	const paymentResult = document.getElementById("paymentResult");
	const periodResult = document.getElementById("periodResult");
	const rateResult = document.getElementById("rateResult");
	const hintTwo = document.querySelector('#hintTwo');
	const hintThree = document.querySelector('#hintThree');
	const costRight = document.querySelector('#costRight');
	const periodRight = document.querySelector('#periodRight');
	const rateRight = document.querySelector('#rateRight');
	const resultRight = document.querySelector('#resultRight');
	cost.addEventListener('input', (e) => {
		costResult.innerHTML = `${numberWithSpaces(cost.value)} ₽`;
		payment.max = cost.value;
		if (payment.value == payment.max) { paymentResult.innerHTML = `${numberWithSpaces(payment.value)} ₽`; }
		cost.style.background = `linear-gradient(to right, #FFDD2D ${(cost.value / cost.max) * 100}%, #DFE0E1 ${(cost.value / cost.max) * 100}%)`;
		payment.style.background = `linear-gradient(to right, #FFDD2D ${(payment.value / payment.max) * 100}%, #DFE0E1 ${(payment.value / payment.max) * 100}%)`;
		hintTwo.innerHTML = `${(parseInt((payment.max / 1000000 / 2) * 100)) / 100} млн`;
		hintThree.innerHTML = `${(parseInt((payment.max / 1000000) * 100)) / 100} млн`;
		costRight.innerHTML = `${numberWithSpaces(cost.value - payment.value)} ₽`;
		resultRight.innerHTML = `${numberWithSpaces(ipoteka((cost.value - payment.value), (period.value), (rate.value)))} ₽`;
	});
	payment.addEventListener('input', (e) => {
		paymentResult.innerHTML = `${numberWithSpaces(payment.value)} ₽`;
		payment.style.background = `linear-gradient(to right, #FFDD2D ${(payment.value / payment.max) * 100}%, #DFE0E1 ${(payment.value / payment.max) * 100}%)`;
		hintTwo.innerHTML = `${(parseInt((payment.max / 1000000 / 2) * 100)) / 100} млн`;
		hintThree.innerHTML = `${(parseInt((payment.max / 1000000) * 100)) / 100} млн`;
		costRight.innerHTML = `${numberWithSpaces(cost.value - payment.value)} ₽`;
		resultRight.innerHTML = `${numberWithSpaces(ipoteka((cost.value - payment.value), (period.value), (rate.value)))} ₽`;
	});
	period.addEventListener('input', (e) => {
		if (period.value == 1 || period.value == 21) { periodResult.innerHTML = `${period.value} год`; }
		else if ((period.value > 4 && period.value < 21) || (period.value > 24)) { periodResult.innerHTML = `${period.value} лет`; }
		else { periodResult.innerHTML = `${period.value} года`; }
		period.style.background = `linear-gradient(to right, #FFDD2D ${(period.value / period.max) * 100 - 1}%, #DFE0E1 ${(period.value / period.max) * 100 - 1}%)`;
		periodRight.innerHTML = `${periodResult.innerHTML}`;
		resultRight.innerHTML = `${numberWithSpaces(ipoteka((cost.value - payment.value), (period.value), (rate.value)))} ₽`;
	});
	rate.addEventListener('input', (e) => {
		rateResult.innerHTML = `${rate.value} %`;
		rate.style.background = `linear-gradient(to right, #FFDD2D ${((rate.value - 2) / (rate.max - 2)) * 100 - 2}%, #DFE0E1 ${((rate.value - 2) / (rate.max - 2)) * 100 - 2}%)`;
		rateRight.innerHTML = `${rateResult.innerHTML}`;
		resultRight.innerHTML = `${numberWithSpaces(ipoteka((cost.value - payment.value), (period.value), (rate.value)))} ₽`;
	});
	ipoteka(4000000, 30, 6);
});