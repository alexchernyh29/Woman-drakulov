class Test {
	constructor(data) {
		console.log("data", data);
		this.data = data;
		this.questions = data.questions;
		this.results = data.results;
		this.activeIndex = 0;
		this.answers = {
			А: 0,
			Б: 0,
			В: 0,
			Г: 0,
			Д: 0,
		};

		this.$questionCounter = $(".test__counter-text span");
		this.$questionTitle = $(".test__title");
		this.$answerItem = $(".test__item");
		this.$answer = $(".test__answer");

		this.$resultFrameTitle = $(".result__answer");
		this.$resultFrameText = $(".result__text");
	}

	init() {
		this.handleEvents();
		this.renderQuestion();
	}

	handleEvents() {
		this.$answerItem.on("click", (e) => {
			const id = $(e.target).closest(".test__item").data("id");
			this.answers[id] += 1;
			this.activeIndex += 1;
			if (this.activeIndex >= this.questions.length) {
				this.renderResults();
			} else {
				this.renderQuestion();
			}
		});
		$(".result__btn").on("click", () => {
			setTimeout(() => {
				$("body").removeClass("show-result");
			}, 700);
			this.activeIndex = 0;
			this.answers = {
				А: 0,
				Б: 0,
				В: 0,
				Г: 0,
				Д: 0,
			};
			this.renderQuestion();
		});
	}

	renderQuestion() {
		const currentQuestion = this.questions[this.activeIndex];
		const { title, answers } = currentQuestion;
		this.$questionCounter.text(this.activeIndex + 1);
		this.$questionTitle.html(title);
		this.$answerItem.each((id, item) => {
			$(item).find(".test__answer-text").html(answers[id].text);
		});
		$(".test").css(
			"background-image",
			`url("/images/test-bg${this.activeIndex + 1}.jpg")`
		);
	}

	getWinner() {
		let count = 0;
		let winner = "";
		for (let key in this.answers) {
			if (this.answers[key] > count) {
				count = this.answers[key];
				winner = key;
			}
		}
		return winner;
	}

	renderResults() {
		const winner = this.getWinner();
		$("body").addClass("show-result");
		$("html, body").animate(
			{
				scrollTop: $(".result").offset().top,
			},
			500
		);
		const currentResult = this.results.find((item) => item.id === winner);
		const { title, info } = currentResult;
		this.$resultFrameTitle.html(title);
		this.$resultFrameText.html(info);
	}
}

export default Test;
